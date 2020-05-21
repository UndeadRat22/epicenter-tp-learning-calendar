using System.Text;
using Autofac;
using Epicenter.Infrastructure.IoC;
using Epicenter.Infrastructure.Settings;
using Epicenter.Persistence.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Epicenter.Api
{
    public class Startup
    {
        private const string AllowAllCorsPolicy = nameof(AllowAllCorsPolicy);
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.Configure<JwtSettings>(Configuration.GetSection(nameof(JwtSettings)));
            services.Configure<EmailSettings>(Configuration.GetSection(nameof(EmailSettings)));
            services.Configure<LoggingSettings>(Configuration.GetSection(nameof(LoggingSettings)));

            var jwtSettings = Configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>();
            
            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret)),
                        ValidIssuer = jwtSettings.Issuer,
                        ValidAudience = jwtSettings.Audience,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddCors(options => {options.AddPolicy(name: AllowAllCorsPolicy, builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowAnyOrigin();
                });
            });

            services.RegisterDbContext(Configuration);

            services.AddHttpContextAccessor();

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Epicenter API",
                    Version = "v1"
                });
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            var loggingSettings = Configuration.GetSection(nameof(LoggingSettings)).Get<LoggingSettings>();
            IoCRegistry.RegisterComponents(builder, loggingSettings);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, EpicenterDbContext dbContext)
        {
            //if (env.IsDevelopment())
            //{
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Epicenter API");
                c.RoutePrefix = string.Empty;
            });
            //}
            dbContext.Database.EnsureCreated();

            app.UseHttpsRedirection();

            app.UseCors(AllowAllCorsPolicy);

            app.UseAuthentication();

            app.UseRouting();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
