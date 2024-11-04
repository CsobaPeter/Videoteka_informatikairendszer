using System;
using System.ComponentModel.DataAnnotations;

public class ReturnDateAfterBorrowDateAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var borrow = (Videoteka.Models.Borrow)validationContext.ObjectInstance;
        if (borrow.ReturnDate <= borrow.BorrowDate)
        {
            return new ValidationResult("Return date must be after the borrow date.");
        }

        return ValidationResult.Success;
    }
}