import 'bootstrap/dist/css/bootstrap.css'
import {useState} from "react";
import {calculateDuration, calculateCost, formatHoursAndMinutes} from "./helpers";

function App() {
    const [slots, setSlots] = useState([]);
    const [rate, setRate] = useState(15);

    // state for slot hours array
    // slot example
    // {
    //   id: 1,
    //   start: '09:00',
    //   end: '10:00',
    //   totalMin: 60,
    //   totalCost: 1,
    //  }

    const onSlotChangeStart = (id, start) => {
        const newSlots = slots.map((slot) => {
            if (slot.id === id) {
                const totalMin = calculateDuration(start, slot.end)
                return {
                    ...slot,
                    start,
                    totalMin,
                    totalCost: calculateCost(totalMin, rate)
                }
            }
            return slot;
        })
        setSlots(newSlots)
    }

    const onSlotChangeEnd = (id, end) => {
        const newSlots = slots.map((slot) => {
            if (slot.id === id) {
                const totalMin = calculateDuration(slot.start, end);
                return {
                    ...slot,
                    end,
                    totalMin,
                    totalCost: calculateCost(totalMin, rate),
                };
            }
            return slot;
        });

        setSlots(newSlots);
    };


    const onAddSlot = () => {
        const newSlot = {
            id: slots.length + 1,
            start: '',
            end: '',
            totalMin: 0,
            totalCost: 0,
        }

        const updatedSlot = [...slots, newSlot]
        setSlots(updatedSlot)
    };

    const onRemoveSlot = (id) => {
        const updatedSlots = slots.filter((el) => el.id !== id)
        setSlots(updatedSlots)
    };

    const onReset = () => {
        setSlots([])
        setRate(15)
    };

    return (
        <div className='container'>
            <h1>Paycheck Calculation</h1>

            <div className="row mb-4">
                <div className="col-8">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="addon-wrapping">Rate, $</span>
                        <input type="number"
                               className="form-control"
                               placeholder="Rate"
                               aria-describedby="addon-wrapping"
                               value={rate}
                               onChange={(e) => setRate(e.target.value)}
                        />
                    </div>
                </div>


                <div className='col-4'>
                    <button
                        className='btn btn-secondary btn-lg'
                        onClick={onReset}
                    >
                        Reset
                    </button>
                </div>
            </div>


            <div>
                {slots.map((slot) => (
                    <div
                        key={slot.id}
                        className='row row-cols-lg-auto mb-5 gy-2 gx-3 align-items-center'
                    >
                        <div className="col-4">
                            <div className="input-group input-group-lg">
                                <div className="input-group-text">Start</div>
                                <input
                                    type="time"
                                    className="form-control "
                                    value={slot.start}
                                    onChange={(e) => onSlotChangeStart(slot.id, e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="input-group input-group-lg">
                                <div className="input-group-text">End</div>
                                <input
                                    type="time"
                                    className="form-control form-control"
                                    value={slot.end}
                                    onChange={(e) => onSlotChangeEnd(slot.id, e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-1">
                            <button
                                className="btn btn-danger btn-lg"
                                onClick={() => onRemoveSlot(slot.id)}
                            >
                                ⛌
                            </button>
                        </div>

                        <div className="col-3">
                            <div className="row small">
                                <div
                                    className="col-xs-12">{formatHoursAndMinutes(slot.totalMin)}</div>
                                <div className="col-xs-12">${Math.floor(slot.totalCost)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mb-3'>
                <button
                    className='btn btn-primary btn-lg'
                    onClick={onAddSlot}
                >
                    Add slot
                </button>
            </div>

            <div>
                <h4>Total
                    time {formatHoursAndMinutes(slots.reduce((acc, slot) => acc + slot.totalMin, 0))}</h4>
                <h4>
                    ${slots.reduce((acc, slot) => acc + slot.totalCost, 0)}
                </h4>

            </div>
        </div>
    );
}

export default App;
