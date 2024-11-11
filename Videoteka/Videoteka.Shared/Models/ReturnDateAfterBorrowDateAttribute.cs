using System;
using System.ComponentModel.DataAnnotations;

namespace Videoteka.Shared.Models
{
    public class ReturnDateAfterBorrowDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var borrow = (Borrow)validationContext.ObjectInstance;
            if (borrow.ReturnDate <= borrow.BorrowDate)
            {
                return new ValidationResult("Return date must be after the borrow date.");
            }

            return ValidationResult.Success;
        }
    }
}