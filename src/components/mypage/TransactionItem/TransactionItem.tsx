import "./styles.css";

interface TransactionItemProps {
  type: string;
  amount: string;
  date: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  amount,
  date,
}) => (
  <div className="transactionItem">
    <div className="left">
      <span
        className={`transactionType ${
          type === "입금" ? "deposit" : "withdrawal"
        }`}
      >
        {type}
      </span>
      <span className="transactionDate">{date}</span>
    </div>
    <span className="transactionAmount">{amount}원</span>
  </div>
);

export default TransactionItem;
