import MultiSelect from '@/components/MultiSelect';
import { options } from '@/data/options';
import './style.css';

export default function Home() {
  return (
    <div className="app">
      <div className="select-container">
        <MultiSelect options={options} />
      </div>
    </div>
  );
}
