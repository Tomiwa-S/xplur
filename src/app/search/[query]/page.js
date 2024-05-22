import dynamic from "next/dynamic";
import Page from "./search";
import Loading from "@/app/components/loading";

const ClientComponent = dynamic(() => import('./search'), {
  
  loading: () => <Loading/>,
  
  
});

export default ClientComponent;