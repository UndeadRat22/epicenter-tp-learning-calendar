using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Epicenter.Api.Model.Attributes
{
    public class MinimumElementsRequiredAttribute : ValidationAttribute
    {
        private readonly int _requiredElements;

        public MinimumElementsRequiredAttribute(int requiredElements)
        {
            if (requiredElements < 1)
            {
                throw new ArgumentOutOfRangeException(nameof(requiredElements), "Minimum element count of 1 is required.");
            }

            _requiredElements = requiredElements;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (!(value is IEnumerable enumerable))
            {
                return new ValidationResult($"The {validationContext.DisplayName} field is required.");
            }

            int elementCount = 0;
            IEnumerator enumerator = enumerable.GetEnumerator();
            while (enumerator.MoveNext())
            {
                if (enumerator.Current != null && ++elementCount >= _requiredElements)
                {
                    return ValidationResult.Success;
                }
            }

            return new ValidationResult($"At least {_requiredElements} elements are required for the {validationContext.DisplayName} field.");
        }
    }
}