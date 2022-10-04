export const navLinks = [
  { name: "ΣΑΠΟΥΝΙΑ", 
   path: "/products" 
  },
  {
    name: "ΠΡΟΪΟΝΤΑ",
    path: "/products",
  },
  {
    name: "ΑΛΛΑ",
    path: "/products",
  },
  {
    name: "ΣΧΕΤΙΚΑ",
    path: "/about",
  },
];

export const collections = [
  {
    name: "Σαπούνια", 
    id: "gid://shopify/ProductVariant/410825031921"
  },
  {
    name: "Πρόσωπο", 
    id: "gid://shopify/ProductVariant/410825064689"
  },
  {
    name: "Σώμα", 
    id: "gid://shopify/ProductVariant/410825097457"
  },
  {
    name: "Σαμπουάν - Αφρόλουτρο", 
    id: "gid://shopify/ProductVariant/410825162993"
  },
  {
    name: "Κηραλοιφές", 
    id: "gid://shopify/ProductVariant/410825195761"
  },
  {
    name: "Peeling", 
    id: "gid://shopify/ProductVariant/410825228529"
  },
  {
    name: "Λάδια Μασάζ", 
    id: "gid://shopify/ProductVariant/410825261297"
  }
]

export const validate = () => {

const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      error.name = "First Name is required";
    }

    if (!values.lastName) {
      error.surname = "Last Name is required";
    }

    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format";
    }

    if (!values.password) {
      error.password = "Password is required";
    } else if (matchPass != values.password) {
      error.password = "Passwords do not match";
    } else if (values.password.length < 4) {
      error.password = "Password must be at least 5 characters!";
    } 
    if (!phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    if (!values.address1) {
      error.address = "Street Address is required";
    }

    if (!values.city) {
      error.city = "City or Town is required";
    }

    if (values.country) {
      error.country = "Country is required";
    }
    if (!values.zip) {
      error.zip = "Zip Code is required";
    }

    return error;
}
