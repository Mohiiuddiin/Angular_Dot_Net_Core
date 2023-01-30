using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd_Api.Models
{
    public class Customer
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int Id { get; set; }
        [Key]
        public string Code { get; set; } 
        public string Name { get; set; } 
        public string Address { get; set; }
        public string Phoneno { get; set; }
        public string Email { get; set; }
        public bool? IsActive { get; set; }
        public string CreateUser { get; set; }
        public string ModifyUser { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ModifyDate { get; set; }
    }


}
