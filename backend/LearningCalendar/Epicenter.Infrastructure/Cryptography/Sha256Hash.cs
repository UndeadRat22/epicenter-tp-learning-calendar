using System;
using System.Security.Cryptography;
using System.Text;

namespace Epicenter.Infrastructure.Cryptography
{
    public static class Sha256Hash
    {
        public static string Calculate(string value)
        {
            using var sha256 = SHA256.Create();
            byte[] bytesToHash = Encoding.UTF8.GetBytes(value);
            byte[] hashBytes = sha256.ComputeHash(bytesToHash);

            return BitConverter.ToString(hashBytes).Replace("-", "");
        }
    }
}