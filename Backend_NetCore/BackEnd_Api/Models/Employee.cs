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
        public string City { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string EmployeeStatus { get; set; }
        public string Address { get; set; }
        public DateTime? DateOfBirth { get; set; }



    }
}
