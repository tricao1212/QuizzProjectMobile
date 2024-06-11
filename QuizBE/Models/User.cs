using System.ComponentModel.DataAnnotations;

namespace QuizBE.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Name { get; set; } = string.Empty;
        public string AvatarURL { get; set; } = string.Empty;
        public int Point { get; set; } = 0;
        public int Level { get; set; } = 1;
    }
}
