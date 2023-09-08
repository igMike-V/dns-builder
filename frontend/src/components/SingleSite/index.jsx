import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import siteService from "../../services/siteService";
import styles from "../styles";
import Header from "../Header";
import SiteRecord from "./SiteRecord";

export const SingleSite = () => {
  const [siteData, setSiteData] = useState(null);
  const { url } = useParams();

  useEffect(() => {
    //TODO - get site data
    const fetchSiteData = async () => {
      console.log(url);
      const getSiteData = await siteService.getSite(url);
      if (getSiteData) setSiteData(getSiteData);
      console.log(getSiteData);
    };
    fetchSiteData();
  }, []);

  console.log(siteData);
  if (!siteData) return <div>Loading...</div>;
  return (
    <section className="flex flex-col ">
      <Header />
      <div className="p-4 mb-8 bg-gray-100 rounded-lg">
        <div className="flex flex-col gap-2 mb-4"></div>
        <section className="px-8 sm:px-2">
          <h1 className="mb-4 text-2xl font-bold">
            DNS records for: {siteData.name}
          </h1>
          <h3>{siteData.domain}</h3>
          {siteData &&
            siteData.records.map((record) => (
              <SiteRecord
                key={record.id}
                site={siteData.domain}
                siteRecord={record}
                ip={siteData.ip}
              />
            ))}
        </section>
      </div>
    </section>
  );
};

export default SingleSite;
