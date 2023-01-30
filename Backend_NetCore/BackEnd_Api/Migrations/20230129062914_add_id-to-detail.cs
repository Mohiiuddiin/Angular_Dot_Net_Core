using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_Api.Migrations
{
    public partial class add_idtodetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MasterDetailsData",
                table: "MasterDetailsData");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceNo",
                table: "MasterDetailsData",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "MasterDetailsData",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MasterDetailsData",
                table: "MasterDetailsData",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MasterDetailsData",
                table: "MasterDetailsData");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "MasterDetailsData");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceNo",
                table: "MasterDetailsData",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MasterDetailsData",
                table: "MasterDetailsData",
                column: "InvoiceNo");
        }
    }
}
