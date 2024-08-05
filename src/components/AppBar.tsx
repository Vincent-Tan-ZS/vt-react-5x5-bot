import "./AppBar.scss";

interface ControlItemProp {
    controls: string[],
    action: string
};

const ControlItem = (props: ControlItemProp) => {
    const { controls, action } = props;

    return (
        <div className="control-item">
            <h3>{action}</h3>
            <p>{controls.join(' / ')}</p>
        </div>
    )
}

export default function AppBar() {
    return (
        <div className="appbar">
            <h2>Controls</h2>
            <ControlItem controls={["W", "Up Arrow"]} action={"Move Forward"} />
            <ControlItem controls={["R"]} action={"Rotate"} />
        </div>
    )
}