﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using StemExplorerAPI.Models;

namespace StemExplorerAPI.Migrations
{
    [DbContext(typeof(StemExplorerContext))]
    partial class StemExplorerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.Challenge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Category")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("LocationId")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("Challenges");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.ChallengeLevel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("AnswerType")
                        .HasColumnType("integer");

                    b.Property<List<string>>("Answers")
                        .HasColumnType("text[]");

                    b.Property<int>("ChallengeId")
                        .HasColumnType("integer");

                    b.Property<int>("Difficulty")
                        .HasColumnType("integer");

                    b.Property<string>("Hint")
                        .HasColumnType("text");

                    b.Property<string>("Instructions")
                        .HasColumnType("text");

                    b.Property<List<string>>("PossibleAnswers")
                        .HasColumnType("text[]");

                    b.Property<string>("QuestionText")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ChallengeId");

                    b.ToTable("ChallengeLevels");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.ExternalContent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ExternalContent");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.Location", b =>
                {
                    b.Property<int>("LocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool>("Featured")
                        .HasColumnType("boolean");

                    b.Property<string>("FeaturedImage")
                        .HasColumnType("text");

                    b.Property<string>("FeaturedText")
                        .HasColumnType("text");

                    b.Property<string>("GooglePlaceId")
                        .HasColumnType("text");

                    b.Property<double?>("Latitude")
                        .HasColumnType("double precision");

                    b.Property<double?>("Longitude")
                        .HasColumnType("double precision");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("OfferText")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("LocationId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.Profile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("HomeTown")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Nickname")
                        .HasColumnType("text");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("text");

                    b.Property<bool>("ProfileCompleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Region")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.Progress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Attempts")
                        .HasColumnType("integer");

                    b.Property<int>("ChallengeLevelId")
                        .HasColumnType("integer");

                    b.Property<bool>("Correct")
                        .HasColumnType("boolean");

                    b.Property<int>("ProfileId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ChallengeLevelId");

                    b.HasIndex("ProfileId", "ChallengeLevelId")
                        .IsUnique();

                    b.ToTable("Progress");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.Challenge", b =>
                {
                    b.HasOne("StemExplorerAPI.Models.Entities.Location", "Location")
                        .WithMany("Challenges")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.ChallengeLevel", b =>
                {
                    b.HasOne("StemExplorerAPI.Models.Entities.Challenge", "Challenge")
                        .WithMany("ChallengeLevels")
                        .HasForeignKey("ChallengeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StemExplorerAPI.Models.Entities.Progress", b =>
                {
                    b.HasOne("StemExplorerAPI.Models.Entities.ChallengeLevel", "ChallengeLevel")
                        .WithMany()
                        .HasForeignKey("ChallengeLevelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StemExplorerAPI.Models.Entities.Profile", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
