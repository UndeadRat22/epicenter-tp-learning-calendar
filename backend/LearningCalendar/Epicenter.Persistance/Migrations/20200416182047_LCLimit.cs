using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Epicenter.Persistence.Migrations
{
    public partial class LCLimit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LimitId",
                table: "Employees",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Limits",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    DaysPerQuarter = table.Column<int>(nullable: false, defaultValue: 3),
                    TopicsPerDay = table.Column<int>(nullable: false, defaultValue: 4)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Limits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Limits_Employees_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_LimitId",
                table: "Employees",
                column: "LimitId");

            migrationBuilder.CreateIndex(
                name: "IX_Limits_CreatorId",
                table: "Limits",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Limits_LimitId",
                table: "Employees",
                column: "LimitId",
                principalTable: "Limits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Limits_LimitId",
                table: "Employees");

            migrationBuilder.DropTable(
                name: "Limits");

            migrationBuilder.DropIndex(
                name: "IX_Employees_LimitId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LimitId",
                table: "Employees");
        }
    }
}
