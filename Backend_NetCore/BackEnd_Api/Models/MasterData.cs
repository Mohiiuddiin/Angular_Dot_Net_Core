using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd_Api.Models
{
    public class MasterData
    {
        [Key]
        public string InvoiceNo { get; set; } 
        public DateTime InvoiceDate { get; set; }
        public string CustomerId { get; set; } 
        public string CustomerName { get; set; }
        public string DeliveryAddress { get; set; }
        public string Remarks { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Total { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Tax { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal NetTotal { get; set; }
        public string CreateUser { get; set; }
        public DateTime? CreateDate { get; set; }
        public List<MasterDetailData> Details { get; set; }

        public string PaymentType { get; set; }
    }

    
   
}
