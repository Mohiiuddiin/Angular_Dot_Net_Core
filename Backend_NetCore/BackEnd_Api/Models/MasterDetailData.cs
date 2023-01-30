using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Models
{
    public class MasterDetailData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public string PCode { get; set; }
        public string ProductName { get; set; }
        public int Qty { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal SalesPrice { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Total { get; set; }
    }
}
