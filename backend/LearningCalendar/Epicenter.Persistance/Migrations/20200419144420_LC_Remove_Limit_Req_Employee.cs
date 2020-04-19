using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Epicenter.Persistence.Migrations
{
    public partial class LC_Remove_Limit_Req_Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Limits_LimitId",
                table: "Employees");

            migrationBuilder.AlterColumn<Guid>(
                name: "LimitId",
                table: "Employees",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Limits_LimitId",
                table: "Employees",
                column: "LimitId",
                principalTable: "Limits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Limits_LimitId",
                table: "Employees");

            migrationBuilder.AlterColumn<Guid>(
                name: "LimitId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Limits_LimitId",
                table: "Employees",
                column: "LimitId",
                principalTable: "Limits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
