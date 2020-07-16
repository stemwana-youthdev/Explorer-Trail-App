﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly ILocationService _locationService;

        public LocationController(ILogger<LocationController> logger, ILocationService locationService)
        {
            _logger = logger;
            _locationService = locationService;
        }

        // GET: api/GetLocations
        [HttpGet("GetLocations")]
        public async Task<IActionResult> GetAllLocations()
        {
            try
            {
                return Ok(await _locationService.GetLocations());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
            
        }

        // GET: api/Location/5
        [HttpGet("{id}", Name ="GetById")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var location = await _locationService.GetLocationById(id);

                if (location == null)
                {
                    return NotFound();
                }

                return Ok(location);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST: api/Location/AddLocation
        [HttpPost("AddLocation")]
        public async Task<IActionResult> AddLocationAsync([FromBody] LocationRequestDto locationDto)
        {
            try
            {
                var locationId = await _locationService.AddLocation(locationDto);
                return CreatedAtRoute("GetById", new { id = locationId }, locationDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        //// PUT: api/Location/UpdateLocation
        [HttpPut("UpdateLocation")]
        public async Task<IActionResult> Put([FromBody] LocationDto locationDto)
        {
            try
            {
                var location = await _locationService.GetLocationById(locationDto.Id);

                if (location == null)
                {
                    return NotFound();
                }

                await _locationService.EditLocation(locationDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // DELETE: api/Location/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var location = await _locationService.GetLocationById(id);

                if (location == null)
                {
                    return NotFound();
                }

                await _locationService.DeleteLocation(location);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
