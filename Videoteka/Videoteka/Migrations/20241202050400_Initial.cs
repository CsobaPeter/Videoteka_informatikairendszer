using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Videoteka.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Borrows",
                columns: table => new
                {
                    BorrowId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ClientId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MediaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    BorrowDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Returned = table.Column<bool>(type: "INTEGER", nullable: false),
                    HasBeenExtended = table.Column<bool>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Borrows", x => x.BorrowId);
                    table.ForeignKey(
                       name: "FK_Borrows_Medias_MediaId",
                       column: x => x.MediaId,
                       principalTable: "Medias",
                       principalColumn: "MediaId",
                       onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                       name: "FK_Borrows_Clients_CLientId",
                       column: x => x.ClientId,
                       principalTable: "Clients",
                       principalColumn: "CLientId",
                       onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    IsSubscribed = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ClientId);
                    table.ForeignKey(
                    name: "FK_Clients_Users_UserId",
                    column: x => x.UserId,
                    principalTable: "Users",
                    principalColumn: "UserId",
                    onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medias",
                columns: table => new
                {
                    MediaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Genre = table.Column<string>(type: "TEXT", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Duration = table.Column<int>(type: "INTEGER", nullable: false),
                    Stock = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medias", x => x.MediaId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: true),
                    RoleOfUser = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Borrows");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Medias");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
