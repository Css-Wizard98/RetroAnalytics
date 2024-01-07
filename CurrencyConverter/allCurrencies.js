const ALL_CURRENCIES = [
    {
        name:'INR',
        value:'INR'
    },
    {
        name: "USD",
        value: "USD"
    },
    {
        name: "AED",
        value: "AED"
    },
    {
        name: "AFN",
        value: "AFN"
    },
    {
        name: "ALL",
        value: "ALL"
    },
    {
        name: "AMD",
        value: "AMD"
    },
    {
        name: "ANG",
        value: "ANG"
    },
    {
        name: "AOA",
        value: "AOA"
    },
    {
        name: "ARS",
        value: "ARS"
    },
    {
        name: "AUD",
        value: "AUD"
    },
    {
        name: "AWG",
        value: "AWG"
    },
    {
        name: "AZN",
        value: "AZN"
    },
    {
        name: "BAM",
        value: "BAM"
    },
    {
        name: "BBD",
        value: "BBD"
    },
    {
        name: "BDT",
        value: "BDT"
    },
    {
        name: "BGN",
        value: "BGN"
    },
    {
        name: "BHD",
        value: "BHD"
    },
    {
        name: "BIF",
        value: "BIF"
    },
    {
        name: "BMD",
        value: "BMD"
    },
    {
        name: "BND",
        value: "BND"
    },
    {
        name: "BOB",
        value: "BOB"
    },
    {
        name: "BRL",
        value: "BRL"
    },
    {
        name: "BSD",
        value: "BSD"
    },
    {
        name: "BTC",
        value: "BTC"
    },
    {
        name: "BTN",
        value: "BTN"
    },
    {
        name: "BWP",
        value: "BWP"
    },
    {
        name: "BYN",
        value: "BYN"
    },
    {
        name: "BYR",
        value: "BYR"
    },
    {
        name: "BZD",
        value: "BZD"
    },
    {
        name: "CAD",
        value: "CAD"
    },
    {
        name: "CDF",
        value: "CDF"
    },
    {
        name: "CHF",
        value: "CHF"
    },
    {
        name: "CLF",
        value: "CLF"
    },
    {
        name: "CLP",
        value: "CLP"
    },
    {
        name: "CNY",
        value: "CNY"
    },
    {
        name: "COP",
        value: "COP"
    },
    {
        name: "CRC",
        value: "CRC"
    },
    {
        name: "CUC",
        value: "CUC"
    },
    {
        name: "CUP",
        value: "CUP"
    },
    {
        name: "CVE",
        value: "CVE"
    },
    {
        name: "CZK",
        value: "CZK"
    },
    {
        name: "DJF",
        value: "DJF"
    },
    {
        name: "DKK",
        value: "DKK"
    },
    {
        name: "DOP",
        value: "DOP"
    },
    {
        name: "DZD",
        value: "DZD"
    },
    {
        name: "EGP",
        value: "EGP"
    },
    {
        name: "ERN",
        value: "ERN"
    },
    {
        name: "ETB",
        value: "ETB"
    },
    {
        name: "EUR",
        value: "EUR"
    },
    {
        name: "FJD",
        value: "FJD"
    },
    {
        name: "FKP",
        value: "FKP"
    },
    {
        name: "GBP",
        value: "GBP"
    },
    {
        name: "GEL",
        value: "GEL"
    },
    {
        name: "GGP",
        value: "GGP"
    },
    {
        name: "GHS",
        value: "GHS"
    },
    {
        name: "GIP",
        value: "GIP"
    },
    {
        name: "GMD",
        value: "GMD"
    },
    {
        name: "GNF",
        value: "GNF"
    },
    {
        name: "GTQ",
        value: "GTQ"
    },
    {
        name: "GYD",
        value: "GYD"
    },
    {
        name: "HKD",
        value: "HKD"
    },
    {
        name: "HNL",
        value: "HNL"
    },
    {
        name: "HRK",
        value: "HRK"
    },
    {
        name: "HTG",
        value: "HTG"
    },
    {
        name: "HUF",
        value: "HUF"
    },
    {
        name: "IDR",
        value: "IDR"
    },
    {
        name: "ILS",
        value: "ILS"
    },
    {
        name: "IMP",
        value: "IMP"
    },
    {
        name: "IQD",
        value: "IQD"
    },
    {
        name: "IRR",
        value: "IRR"
    },
    {
        name: "ISK",
        value: "ISK"
    },
    {
        name: "JEP",
        value: "JEP"
    },
    {
        name: "JMD",
        value: "JMD"
    },
    {
        name: "JOD",
        value: "JOD"
    },
    {
        name: "JPY",
        value: "JPY"
    },
    {
        name: "KES",
        value: "KES"
    },
    {
        name: "KGS",
        value: "KGS"
    },
    {
        name: "KHR",
        value: "KHR"
    },
    {
        name: "KMF",
        value: "KMF"
    },
    {
        name: "KPW",
        value: "KPW"
    },
    {
        name: "KRW",
        value: "KRW"
    },
    {
        name: "KWD",
        value: "KWD"
    },
    {
        name: "KYD",
        value: "KYD"
    },
    {
        name: "KZT",
        value: "KZT"
    },
    {
        name: "LAK",
        value: "LAK"
    },
    {
        name: "LBP",
        value: "LBP"
    },
    {
        name: "LKR",
        value: "LKR"
    },
    {
        name: "LRD",
        value: "LRD"
    },
    {
        name: "LSL",
        value: "LSL"
    },
    {
        name: "LTL",
        value: "LTL"
    },
    {
        name: "LVL",
        value: "LVL"
    },
    {
        name: "LYD",
        value: "LYD"
    },
    {
        name: "MAD",
        value: "MAD"
    },
    {
        name: "MDL",
        value: "MDL"
    },
    {
        name: "MGA",
        value: "MGA"
    },
    {
        name: "MKD",
        value: "MKD"
    },
    {
        name: "MMK",
        value: "MMK"
    },
    {
        name: "MNT",
        value: "MNT"
    },
    {
        name: "MOP",
        value: "MOP"
    },
    {
        name: "MRO",
        value: "MRO"
    },
    {
        name: "MUR",
        value: "MUR"
    },
    {
        name: "MVR",
        value: "MVR"
    },
    {
        name: "MWK",
        value: "MWK"
    },
    {
        name: "MXN",
        value: "MXN"
    },
    {
        name: "MYR",
        value: "MYR"
    },
    {
        name: "MZN",
        value: "MZN"
    },
    {
        name: "NAD",
        value: "NAD"
    },
    {
        name: "NGN",
        value: "NGN"
    },
    {
        name: "NIO",
        value: "NIO"
    },
    {
        name: "NOK",
        value: "NOK"
    },
    {
        name: "NPR",
        value: "NPR"
    },
    {
        name: "NZD",
        value: "NZD"
    },
    {
        name: "OMR",
        value: "OMR"
    },
    {
        name: "PAB",
        value: "PAB"
    },
    {
        name: "PEN",
        value: "PEN"
    },
    {
        name: "PGK",
        value: "PGK"
    },
    {
        name: "PHP",
        value: "PHP"
    },
    {
        name: "PKR",
        value: "PKR"
    },
    {
        name: "PLN",
        value: "PLN"
    },
    {
        name: "PYG",
        value: "PYG"
    },
    {
        name: "QAR",
        value: "QAR"
    },
    {
        name: "RON",
        value: "RON"
    },
    {
        name: "RSD",
        value: "RSD"
    },
    {
        name: "RUB",
        value: "RUB"
    },
    {
        name: "RWF",
        value: "RWF"
    },
    {
        name: "SAR",
        value: "SAR"
    },
    {
        name: "SBD",
        value: "SBD"
    },
    {
        name: "SCR",
        value: "SCR"
    },
    {
        name: "SDG",
        value: "SDG"
    },
    {
        name: "SEK",
        value: "SEK"
    },
    {
        name: "SGD",
        value: "SGD"
    },
    {
        name: "SHP",
        value: "SHP"
    },
    {
        name: "SLL",
        value: "SLL"
    },
    {
        name: "SOS",
        value: "SOS"
    },
    {
        name: "SRD",
        value: "SRD"
    },
    {
        name: "STD",
        value: "STD"
    },
    {
        name: "SVC",
        value: "SVC"
    },
    {
        name: "SYP",
        value: "SYP"
    },
    {
        name: "SZL",
        value: "SZL"
    },
    {
        name: "THB",
        value: "THB"
    },
    {
        name: "TJS",
        value: "TJS"
    },
    {
        name: "TMT",
        value: "TMT"
    },
    {
        name: "TND",
        value: "TND"
    },
    {
        name: "TOP",
        value: "TOP"
    },
    {
        name: "TRY",
        value: "TRY"
    },
    {
        name: "TTD",
        value: "TTD"
    },
    {
        name: "TWD",
        value: "TWD"
    },
    {
        name: "TZS",
        value: "TZS"
    },
    {
        name: "UAH",
        value: "UAH"
    },
    {
        name: "UGX",
        value: "UGX"
    },
   
    {
        name: "UYU",
        value: "UYU"
    },
    {
        name: "UZS",
        value: "UZS"
    },
    {
        name: "VEF",
        value: "VEF"
    },
    {
        name: "VND",
        value: "VND"
    },
    {
        name: "VUV",
        value: "VUV"
    },
    {
        name: "WST",
        value: "WST"
    },
    {
        name: "XAF",
        value: "XAF"
    },
    {
        name: "XAG",
        value: "XAG"
    },
    {
        name: "XAU",
        value: "XAU"
    },
    {
        name: "XCD",
        value: "XCD"
    },
    {
        name: "XDR",
        value: "XDR"
    },
    {
        name: "XOF",
        value: "XOF"
    },
    {
        name: "XPF",
        value: "XPF"
    },
    {
        name: "YER",
        value: "YER"
    },
    {
        name: "ZAR",
        value: "ZAR"
    },
    {
        name: "ZMK",
        value: "ZMK"
    },
    {
        name: "ZMW",
        value: "ZMW"
    },
    {
        name: "ZWL",
        value: "ZWL"
    }
]

export default ALL_CURRENCIES