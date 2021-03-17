import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  });

  /*const incomes = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
  const outcomes = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'withdraw') {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
  const total = incomes - outcomes;*/

  /*const [incomes, setIncomes] = useState(0);
  const [outcomes, setOutcomes] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    let deposits = 0;
    let withdraws = 0;
    transactions.forEach((t) => {
      if(t.type === 'deposit') {
        deposits += t.amount;
      } else {
        withdraws += t.amount;
      }
    });
    setIncomes(deposits);
    setOutcomes(withdraws);
    setTotal(deposits - withdraws);
  }, [transactions]);*/
  
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className={`highlight-${summary.total >= 0 ? 'positive' : 'negative'}`}>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}