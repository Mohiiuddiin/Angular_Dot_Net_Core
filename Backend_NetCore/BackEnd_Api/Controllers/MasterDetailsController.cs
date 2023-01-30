using BackEnd_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterDetailsController : Controller
    {
        private readonly DataContext _context;
        public MasterDetailsController(DataContext dataContext)
        {
            _context = dataContext;
        }
        //public async Task<ResponseType> Save(InvoiceInput invoiceEntity)
        //{
        //    string Result = string.Empty;
        //    int processcount = 0;
        //    var response = new ResponseType();
        //    if (invoiceEntity != null)
        //    {
        //        using (var dbtransaction = await this._DBContext.Database.BeginTransactionAsync())
        //        {

        //            if (invoiceEntity != null)
        //                Result = await this.SaveHeader(invoiceEntity);

        //            if (!string.IsNullOrEmpty(Result) && (invoiceEntity.details != null && invoiceEntity.details.Count > 0))
        //            {
        //                invoiceEntity.details.ForEach(item =>
        //                {
        //                    bool saveresult = this.SaveDetail(item, invoiceEntity.CreateUser, invoiceEntity.InvoiceNo).Result;
        //                    if (saveresult)
        //                    {
        //                        processcount++;
        //                    }
        //                });

        //                if (invoiceEntity.details.Count == processcount)
        //                {
        //                    await this._DBContext.SaveChangesAsync();
        //                    await dbtransaction.CommitAsync();
        //                    response.Result = "pass";
        //                    response.KyValue = Result;
        //                }
        //                else
        //                {
        //                    await dbtransaction.RollbackAsync();
        //                    response.Result = "faill";
        //                    response.Result = string.Empty;
        //                }
        //            }
        //            else
        //            {
        //                response.Result = "faill";
        //                response.Result = string.Empty;
        //            }

        //            // await this._DBContext.SaveChangesAsync();
        //            //         await dbtransaction.CommitAsync();
        //            //         response.Result = "pass";
        //            //         response.KyValue = Result;

        //        };
        //    }
        //    else
        //    {
        //        return new ResponseType();
        //    }
        //    return response;

        //}
        [HttpPost]
        public async Task<IActionResult> SaveData([FromBody] MasterData masterData)
        {
            //masterData.Id = Guid.NewGuid();

            //var dept = await _context.Departments.Where(x => x.Id == employee.DepartmentId).FirstAsync();
            //employee.DepartmentName = dept.Name; await _context.Employees.AddAsync(employee);
            //await _context.SaveChangesAsync();
            //return Ok(employee);

            //string result = string.Empty;
            //int procCount = 0;
            var resp = new RespType();

            if (masterData!=null)
            {
                //using (var dbTrans = await _context.Database.BeginTransactionAsync())
                //{
                try
                {
                    
                    var master_data_isexist = await _context.MastersData.FirstOrDefaultAsync(x=>x.InvoiceNo == masterData.InvoiceNo);
                    if (master_data_isexist != null)
                    {
                        master_data_isexist.CustomerName = masterData.CustomerName;
                        master_data_isexist.CustomerId = masterData.CustomerId;
                        master_data_isexist.Remarks = masterData.Remarks;
                        master_data_isexist.Tax = masterData.Tax;
                        master_data_isexist.DeliveryAddress = masterData.DeliveryAddress;
                        master_data_isexist.Total = masterData.Total;
                        master_data_isexist.NetTotal = masterData.NetTotal;
                        var master_det_data = await this._context.MasterDetailsData.Where(item => item.InvoiceNo == masterData.InvoiceNo).ToListAsync();
                        if (master_det_data != null && master_det_data.Count > 0)
                        {
                            this._context.MasterDetailsData.RemoveRange(master_det_data);
                        }
                        
                        if (masterData.Details!=null)
                        {
                            foreach (var item in masterData.Details)
                            {
                                item.InvoiceNo = masterData.InvoiceNo;
                                await this._context.MasterDetailsData.AddAsync(item);
                            }
                        }                        
                        await _context.SaveChangesAsync();
                        resp.Result = "pass";
                        resp.KeyVal = masterData.InvoiceNo;
                    }
                    else
                    {
                        masterData.InvoiceDate = DateTime.Now;
                        await _context.MastersData.AddAsync(masterData);
                        //await _context.SaveChangesAsync();
                        List<MasterDetailData> details = new List<MasterDetailData>();
                        details = masterData.Details.ToList();
                        foreach (var item in details)
                        {
                            if (item != null)
                            {
                                item.InvoiceNo = masterData.InvoiceNo;
                                await _context.MasterDetailsData.AddAsync(item);

                            }
                        }
                        await _context.SaveChangesAsync();
                        resp.Result = "pass";
                        resp.KeyVal = masterData.InvoiceNo;
                    }                    
                }
                catch (Exception)
                {
                    resp.Result = "faill";
                    resp.Result = string.Empty;
                    //throw;
                }

                //}
            }

            return Ok(resp);
        }

        [HttpGet]
        [Route("GetMasterDataByInv/{invoiceno}")]
        public async Task<IActionResult> GetMasterDataByInv([FromRoute] string invoiceno)
        {
            var data = await _context.MastersData.FirstOrDefaultAsync(x=>x.InvoiceNo==invoiceno);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetMasterDetailByInv/{invoiceno}")]
        public async Task<IActionResult> GetMasterDetailByInv([FromRoute] string invoiceno)
        {
            var data = await _context.MasterDetailsData.Where(x=>x.InvoiceNo==invoiceno).ToListAsync();
            return Ok(data);
        }

        [HttpGet]
        
        public async Task<IActionResult> GetAllMasterData()
        {
            var data = await _context.MastersData.ToListAsync();
            return Ok(data);
        }

        [HttpDelete]
        [Route("{invoiceno}")]
        public async Task<IActionResult> Delete([FromRoute] string invoiceno)
        {
            try
            {
                using (var dbtransaction = await this._context.Database.BeginTransactionAsync())
                {
                    var master_data = await this._context.MastersData.FirstOrDefaultAsync(item => item.InvoiceNo == invoiceno);
                    if (master_data != null)
                    {
                        this._context.MastersData.Remove(master_data);
                    }
                    var master_det_data = await this._context.MasterDetailsData.Where(item => item.InvoiceNo == invoiceno).ToListAsync();
                    if (master_det_data != null && master_det_data.Count > 0)
                    {
                        this._context.MasterDetailsData.RemoveRange(master_det_data);
                    }
                    await this._context.SaveChangesAsync();
                    await dbtransaction.CommitAsync();
                }
                return Ok(new RespType() { Result = "pass", KeyVal = invoiceno });
            }
            catch (Exception ex)
            {
                //throw ex;
                return Ok(new RespType() { Result = "failed", KeyVal = invoiceno });
            }
        }
    }
}
