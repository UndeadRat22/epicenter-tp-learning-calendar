using Microsoft.EntityFrameworkCore.Migrations;

namespace Epicenter.Persistence.Migrations
{
    public partial class LC_Topic_Restrictions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Subject",
                table: "Topics",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_Subject",
                table: "Topics",
                column: "Subject",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Topics_Subject",
                table: "Topics");

            migrationBuilder.AlterColumn<string>(
                name: "Subject",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
