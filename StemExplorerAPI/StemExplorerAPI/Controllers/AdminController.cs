﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private ILogger _logger;
        private IAdminService _adminService;

        public AdminController(ILogger<HomeController> logger, IAdminService adminService)
        {
            _logger = logger;
            _adminService = adminService;
        }

        [HttpGet("UserIsAdmin")]
        [Authorize]
        public async Task<ActionResult<bool>> UserIsAdmin()
        {
            return await _adminService.UserIsAdmin(HttpContext.User);
        }

        [HttpGet("AllAdmins")]
        public async Task<ActionResult<List<string>>> GetAllAdmins()
        {
            return await _adminService.GetAllAdmins();
        }

        [HttpDelete("")]
        public async Task DeleteAdmin(string email)
        {
            await _adminService.DeleteAdmin(email);
        }

        [HttpPost("")]
        public async Task CreateAdmin(string email)
        {
            await _adminService.CreateAdmin(email);
        }
    }
}