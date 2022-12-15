import React from 'react';
import pdf from "../../../images/pdf.png";
import word from "../../../images/word.png";
import excel from "../../../images/excel.png"

type documentCard = {
    name: string
}

const DocumentCard = () => {

    const getIcon = (type: string) => {
        switch (type) {
            case "word":
                return word;
            case "excel":
                return excel;
            case "pdf":
                return pdf;
        }
    }

    return (
        <div className="border-gray-200 rounded-md">
            <div>
                <h3>Title</h3>
                <img src={getIcon("word")} alt=""/>
            </div>
        </div>
    );
};

export default DocumentCard;