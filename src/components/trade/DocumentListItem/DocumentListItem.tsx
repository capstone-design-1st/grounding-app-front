import React from "react";
import "./styles.css";
import pdfIcon from "../../../assets/icons/pdf.png";
import downloadIcon from "../../../assets/icons/download.png";

interface DocumentItem {
  id: string;
  title: string;
  s3_url: string;
  cloudfront_url: string;
}

interface DocumentListProps {
  documents: DocumentItem[];
}

const DocumentListItem: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div className="documentList">
      {documents.map((doc, index) => (
        <div key={index} className="documentItem">
          <img src={pdfIcon} alt="PDF Icon" className="pdfIcon" />
          <a
            href={`https://${doc.cloudfront_url}`}
            className="documentTitle"
            target="_blank"
            rel="noopener noreferrer"
          >
            {doc.title}
          </a>
          <a
            href={`https://${doc.cloudfront_url}`}
            className="downloadIcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={downloadIcon} alt="Download Icon" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentListItem;
