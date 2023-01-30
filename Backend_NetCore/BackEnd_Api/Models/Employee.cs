namespace BackEnd_Api.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Salary { get; set; }

        public virtual Department Department { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }



    }
}
