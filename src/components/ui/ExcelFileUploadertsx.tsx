import { Button, } from "@mui/material";

import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { green } from "@mui/material/colors";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";


interface IProps {
  onSetData: (data: any) => void;
  className?: string
}

export default function ExcelFileUploadertsx(props: IProps) {

  const handleFileChange = (event: any) => {

    try {
      if (!event.target?.files) return;
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const dataSet = new Uint8Array(await (event.target as any).result);
          const workbook = XLSX.read(dataSet, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any;
          parsedData.shift();
          const rowsWithId = parsedData.map((row: any, index: number) => {
            if (row[0] != null && row[0] != undefined) {
              var obj = { code: row[0].toString(), name: row[1], price: row[2], type: row[3] };
              return obj;
            }
          });
          props.onSetData(rowsWithId);
        };

        reader.readAsArrayBuffer(file);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, {position: 'top-left',});
    } finally {
      // Reset the input value
      if (event.target) event.target.value = "";
    }
  };

  return (
    <div className={props.className}>
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<CloudUploadIcon style={{ padding: "0px", marginRight: "-10px", marginLeft: "12px" }} />}
        sx={{ widows: '300px', marginY: '6px', backgroundColor: green }}
      >
        آپلود فايل
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleFileChange(e)}
          multiple
        />
      </Button>
      </div>
  );
}
