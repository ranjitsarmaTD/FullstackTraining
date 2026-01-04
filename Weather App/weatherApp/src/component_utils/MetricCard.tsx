
type MetricCardProps = {
  label: string;
  value: number | string;
  unit?: string;
};


const MetricCard = ({label,value,unit}:MetricCardProps) => { {
  return <div className="weather-metric-card">
    <p className="weather-card__label">{label}</p>
    <p className="weather-card__value">
        {value}
        {unit && <span className="weather-card__unit">{unit}</span>}
    </p>

  </div>
 }
}       
export default MetricCard;