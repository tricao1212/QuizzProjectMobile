using Microsoft.EntityFrameworkCore;
using QuizBE.Models;
using System.Collections.Generic;

namespace QuizBE.Data
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options)
           : base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}
