using System;
using System.ComponentModel.DataAnnotations;

public class ReleaseDateNotInPastAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is DateTime releaseDate)
        {
            if (releaseDate < DateTime.Today)
            {
                return new ValidationResult("Release date cannot be earlier than today.");
            }
        }

        return ValidationResult.Success;
    }
}
