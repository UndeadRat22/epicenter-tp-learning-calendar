using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Epicenter.Persistence.Migrations
{
    public partial class LC_Topic_RowVersion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Topics",
                rowVersion: true,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Topics");
        }
    }
}
