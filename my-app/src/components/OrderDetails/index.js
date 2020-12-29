import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Order/order.actions";

const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];

const styles = {
  fontSize: "16px",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productThumbnail":
      return (
        <img
          style={{ maxWidth: "100%" }}
          src={columnValue}
          alt="thumbnail"
        />
      );
    case "productPrice":
      return `$ ${columnValue}`;

    default:
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, pos) => (
              <TableCell key={pos} style={styles}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => (
              <TableRow key={pos}>
                {columns.map((column, pos) => {
                  const columnName = column.id;
                  const columnValue = row[columnName];
                  const formattedText = formatText(
                    columnName,
                    columnValue
                  );
                  return (
                    <TableCell key={pos} style={styles}>
                      {formattedText}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails;
