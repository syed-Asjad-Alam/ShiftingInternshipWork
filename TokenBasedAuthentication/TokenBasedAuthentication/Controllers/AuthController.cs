using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using TokenBasedAuthentication.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.AspNetCore.Mvc.Authorization;
using TokenBasedAuthentication.ViewModels;

namespace TokenBasedAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase

    {
        public static UserInfo user = new UserInfo();
        private readonly IConfiguration _configuration;

        private readonly AppDbContext _appDbContext;

        public AuthController(IConfiguration configuration, AppDbContext appDbContext)
        {
            _configuration = configuration;
            _appDbContext = appDbContext;
        }

        [HttpGet("{id}"),Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfo>> GetUser(int id)
        {
            if (_appDbContext.UserInfo == null)
            {
                return NotFound();
            }
            var user = await _appDbContext.UserInfo.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        //[HttpGet("GetUserNames/{token}")]
        //public async Task<ActionResult<List<String>>> GetUserNamers(string token)
        //{
        //    if (token == null)
        //    {
        //        return null;
        //    }

        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
        //    bool ValidateIssuerSigningKey;
        //    try
        //    {
        //        tokenHandler.ValidateToken(token, new TokenValidationParameters
        //        {
        //            ValidateIssuerSigningKey = true,
        //            IssuerSigningKey = new SymmetricSecurityKey(key),
        //            ValidateIssuer = false,
        //            ValidateAudience = false,
        //            ClockSkew = TimeSpan.Zero
        //        }, out SecurityToken validatedToken) ; 

        //        var jwtToken = (JwtSecurityToken)validatedToken;
        //        var user = (jwtToken.Claims);
        //        var userName = user.ElementAt(0).Value;
        //        var userRole = user.ElementAt(1).Value;
        //        var users = (from UserInfo in _appDbContext.UserInfo

        //                     select UserInfo.Username).AsQueryable();
        //        return users.ToList();
        //    }
        //    catch
        //    {
        //        return null;
        //    }


        //}


        [HttpPost("register"), AllowAnonymous]
        public async Task<ActionResult<UserInfo>> Register(UserDto request, bool admin, bool user1)
        {
            if (_appDbContext.UserInfo == null)
            {
                return Problem("Entity set '_appDbContext.User'  is null.");
            }

            CreatePasswordHash(request.Password, out byte[] passwordhash, out byte[] passwordsalt);
            var user = new UserInfo();
            var userRole1 = new UserRole();
            var userRole2 = new UserRole();

            if (admin && user1)
            {


                user.Username = request.Username;
                user.PasswordHash = passwordhash;
                user.PasswordSalt = passwordsalt;
                Role role1 = _appDbContext.Roles.FirstOrDefault(r => r.Name == "Admin");
                Role role2 = _appDbContext.Roles.FirstOrDefault(r => r.Name == "User");

                userRole1.User = user;
                userRole1.Role = role1;
                user.UserRoles.Add(userRole1);

                userRole2.User = user;
                userRole2.Role = role2;
                user.UserRoles.Add(userRole2);
            }
            //else if (admin)
            //{
            //    user.Username = request.Username;
            //    user.PasswordHash = passwordhash;
            //    user.PasswordSalt = passwordsalt;
            //    Role role1 = _appDbContext.Roles.FirstOrDefault(r => r.Name == "Admin");

            //    user.Roles.Add(role1);

            //}
            //else if (user1)
            //{
            //    user.Username = request.Username;
            //    user.PasswordHash = passwordhash;
            //    user.PasswordSalt = passwordsalt;
            //    Role role1 = _appDbContext.Roles.FirstOrDefault(r => r.Name == "User");

            //    user.Roles.Add(role1);
            //}
            //else
            //{
            //    user.Username = request.Username;
            //    user.PasswordHash = passwordhash;
            //    user.PasswordSalt = passwordsalt;
            //}





            _appDbContext.UserInfo.Add(user);

            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction("GetUser", new { id = user.UserInfoId }, user);

        }

        //[HttpPost("login"),AllowAnonymous]
        //public async Task<ActionResult<string>> Login(string username, string password)
        //{
        //    var userinfo1 = (from UserInfo in _appDbContext.UserInfo
        //                     where (UserInfo.Username == username)
        //                     select new UserInfo
        //                     {
        //                         UserInfoId = UserInfo.UserInfoId,
        //                         Username = UserInfo.Username,
        //                         PasswordHash = UserInfo.PasswordHash,
        //                         PasswordSalt = UserInfo.PasswordSalt,
        //                         Roles = UserInfo.Roles
        //                     }).AsQueryable().FirstOrDefault();


        //    if (userinfo1 == null)
        //    {
        //        return BadRequest("User not found");
        //    }
        //    if (!VerifyPasswordHash(password, userinfo1.PasswordHash, userinfo1.PasswordSalt))
        //    {
        //        return BadRequest("Wrong Password");
        //    }

        //    string token = CreateToken(userinfo1);

        //    return Ok(token);

        //}

        //private string CreateToken(UserInfo user)
        //{
        //    var Roles = user.Roles;
        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Name, user.Username)
        //    };
        //    foreach (Role role in Roles)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, role.Name));
        //    }

        //    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
        //        _configuration.GetSection("AppSettings:Token").Value));

        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var token = new JwtSecurityToken(
        //        claims: claims,
        //        expires: DateTime.Now.AddDays(1),
        //        signingCredentials: creds
        //        );

        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        //    return jwt;
        //}

        private void CreatePasswordHash(string password, out byte[] passwordhash, out byte[] passwordsalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordsalt = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        //private bool VerifyPasswordHash(string password, byte[] passwordhash, byte[] passwordsalt)
        //{
        //    using (var hmac = new HMACSHA512(passwordsalt))
        //    {
        //        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //        return computedHash.SequenceEqual(passwordhash);
        //    }

        //}

        ////********************************ROLES************************************



        [HttpGet("GetRoles"), AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            if (_appDbContext.Roles == null)
            {
                return NotFound();
            }
            return await _appDbContext.Roles.ToListAsync();
        }


        //[HttpGet("GetRole/{id}"), Authorize(Roles = "Admin")]
        //public async Task<ActionResult<Role>> GETROLE(int id)
        //{
        //    if (_appDbContext.Roles == null)
        //    {
        //        return NotFound();
        //    }
        //    var role = await _appDbContext.Roles.FindAsync(id);

        //    if (role == null)
        //    {
        //        return NotFound();
        //    }

        //    return role;
        //}

        //[HttpPost, AllowAnonymous]
        //public async Task<ActionResult<Role>> AddRole(Role role)
        //{
        //    if (_appDbContext.Roles == null)
        //    {
        //        return Problem("Entity set 'AppDbContext.Roles'  is null.");
        //    }
        //    _appDbContext.Roles.Add(role);
        //    await _appDbContext.SaveChangesAsync();

        //    return CreatedAtAction("GetRole", new { id = role.Id }, role);
        //}

        //private bool RoleExists(int id)
        //{
        //    return (_appDbContext.Roles?.Any(e => e.Id == id)).GetValueOrDefault();
        //}

        //[Route("[action]")]
        //[HttpGet, Authorize(Roles = "Admin")]
        //public async Task<ActionResult<IEnumerable<UserRolesView>>> GetUserRoles()
        //{
        //    var userRoles = (from UserRoles in _appDbContext.UserRoles
        //                     join UserInfo in _appDbContext.UserInfo
        //                     on UserRoles.UserId equals UserInfo.UserInfoId
        //                     join Roles in _appDbContext.Roles
        //                     on UserRoles.RoleId equals Roles.Id
        //                     select new UserRolesView
        //                     {
        //                         UserId = UserInfo.UserInfoId,
        //                         RoleId = Roles.Id,
        //                         UserName = UserInfo.Username,
        //                         RoleName = Roles.Name
        //                     }).AsQueryable();
        //    return userRoles.ToList();
        //}




    }
}
