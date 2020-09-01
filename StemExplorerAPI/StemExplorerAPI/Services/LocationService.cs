﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class LocationService : ILocationService
    {
        private readonly StemExplorerContext _context;
        private readonly ILogger _logger;
        private readonly IProgressService _progressService;
        public LocationService(StemExplorerContext context, ILogger<LocationService> logger, IProgressService progressService)
        {
            _context = context;
            _logger = logger;
            _progressService = progressService;
        }

        public async Task<List<LocationDto>> GetLocations(int? profileId)
        {
            try
            {
                var locations = await _context.Locations
                    .AsNoTracking()
                    .Select(l => new LocationDto
                    {
                        Id = l.LocationId,
                        Name = l.Name,
                        GooglePlaceId = l.GooglePlaceId ?? null,
                        Position = new LocationPositionDto
                        {
                            Lat = l.Latitude ?? null,
                            Lng = l.Longitude ?? null,
                        },
                        LocationChallenges = l.Challenges.Select(lc => new LocationChallenge
                        {
                            ChallengeId = lc.Id,
                            ChallengeCategory = lc.Category,
                            ChallengeDescription = lc.Description,
                            ChallengeTitle = lc.Title,
                            ChallengeLevels = lc.ChallengeLevels.Select(l => new LocationLevelDto
                            {
                                Difficulty = l.Difficulty,
                                Complete = false,
                            }),
                        }).ToList(),
                        Link = l.Url,
                        Phone = l.Phone,
                        Email = l.Email,
                        ChallengeCount = l.Challenges.Count()
                    })
                    .ToListAsync();

                if (profileId != null) 
                {
                    var progress = await _progressService.GetProgress(profileId ?? 0);
                    
                    foreach (var l in locations)
                    {
                        foreach (var lc in l.LocationChallenges)
                        {
                            foreach (var level in lc.ChallengeLevels)
                            {
                                level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                            }
                        }
                    }
                }

                return locations;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<LocationDto> GetLocationById(int locationId)
        {
            try
            {
                return await _context.Locations
                    .AsNoTracking()
                    .Where(l => l.LocationId == locationId)
                    .Select(location => new LocationDto
                    {
                        Id = location.LocationId,
                        Name = location.Name,
                        GooglePlaceId = location.GooglePlaceId,
                        Position = new LocationPositionDto
                        {
                            Lat = location.Latitude ?? null,
                            Lng = location.Longitude ?? null,
                        },
                        LocationChallenges = location.Challenges.Select(lc => new LocationChallenge
                        {
                            ChallengeId = lc.Id,
                            ChallengeTitle = lc.Title,
                            ChallengeDescription = lc.Description,
                            ChallengeCategory = lc.Category
                        }).ToList(),
                        Link = location.Url,
                        ChallengeCount = location.Challenges.Count()
                    }).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }
    }
}
