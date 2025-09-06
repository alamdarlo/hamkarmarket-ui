
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Home from "@mui/icons-material/Home";
import Report from "@mui/icons-material/Report";
import { JSX } from "react";


class navigationChildren {
  name:string= "";
  title?: string | JSX.Element | undefined='';
  link?: string | undefined='';
  isOpen?: boolean= false;
  icon?:JSX.Element=<span/>;
  subChild?:navigationChildren[]=[];

}

const SidebarMenuItems: navigationChildren[] = 
[
  {
    name: "Dashboard",
    icon: <ShoppingCartIcon key={"icon_Analytics"} />,
    title: "داشبورد",
    isOpen:false,
    link:'/',
  },
  {
    name: "Products",
    icon: <Home key={"icon_Home"} />,
    title: "محصولات",
    isOpen:false,
    subChild: [
      {
        name: "productList",
        icon: <Home key={"icon_Home2"} />,
        title:"ايجاد/ويرايش",
        link:"/products",
        isOpen:false,
      },
      {
        name: "productFinancialInformation",
        icon: <Home key={"icon_Home3"} />,
        title:"اطلاعات مالي محصول",
        link:"/productFinancialInformation",
        isOpen:false,
      },
      {
        name: "BaseProductsInfo",
        icon: <Home key={"icon_Home4"} />,
        title:"اطلاعات پايه محصول",
        link:"/BaseProductsInfo",
        isOpen:false,
      },
    ],
  },
  {
    name: "ProductionsInventory",
    icon: <Home key={"icon_Home"} />,
    title: "انبار توليد",
    isOpen:false,
    subChild: [
      {
        name: "informationInventory",
        icon: <Home key={"icon_Home2"} />,
        title:"اطلاعات انبار",
        link:"/productionInventory",
        isOpen:false,
      }
    ],
  },
  {
    name: "BaseMaterials",
    icon: <ShoppingCartIcon key={"icon_Analytics"} />,
    title: "مواد اوليه",
    isOpen:false,
    subChild: [
      {
        name: "butcherPerformance",
        icon: <Home key={"icon_Home21"} />,
        title: "راندمانی/قصابی",// <Link href="/">Home21</Link>,
        link:"/butcherPerformance",
      },
      {
        name: "Materials",
        icon: <Report key={"icon_Report"} />,
        title: "مشاهده",//<Link href="/report">گزارش آماری</Link>,
        link:"/baseMaterials",
        isOpen:false,
      }
    ],
  },

];

export { SidebarMenuItems };
export type { navigationChildren };
