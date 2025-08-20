using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Common
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum value)
        {
            if(value?.GetType() == null)
            {
                return "";
            }
            FieldInfo field = value.GetType().GetField(value.ToString());

            if (field != null)
            {
                DescriptionAttribute[] attributes =
                    (DescriptionAttribute[])field.GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attributes != null && attributes.Length > 0)
                {
                    return attributes[0].Description;
                }
            }
            return value.ToString();
        }
    }
}
