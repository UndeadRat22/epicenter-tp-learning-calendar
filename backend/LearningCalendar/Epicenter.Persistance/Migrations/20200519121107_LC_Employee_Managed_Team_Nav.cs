using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Epicenter.Persistence.Migrations
{
    public partial class LC_Employee_Managed_Team_Nav : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Employees_ManagerId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ManagerId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Teams");

            migrationBuilder.AddColumn<Guid>(
                name: "ManagedTeamId",
                table: "Employees",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManagedTeamId",
                table: "Employees",
                column: "ManagedTeamId",
                unique: true,
                filter: "[ManagedTeamId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Teams_ManagedTeamId",
                table: "Employees",
                column: "ManagedTeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Teams_ManagedTeamId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ManagedTeamId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ManagedTeamId",
                table: "Employees");

            migrationBuilder.AddColumn<Guid>(
                name: "ManagerId",
                table: "Teams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ManagerId",
                table: "Teams",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Employees_ManagerId",
                table: "Teams",
                column: "ManagerId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
