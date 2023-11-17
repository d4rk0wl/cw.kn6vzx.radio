import '../styles/sidenav.scss'

interface Props{
  title: string,
  icon: React.ReactNode,
  active: boolean,
  setActive: () => void
}

function SidenavIcon({title, icon, active, setActive}:Props):JSX.Element{
  return(
    <>
      <div className={active ? "sidenav-icon active" : "sidenav-icon"} onClick={setActive}>
        <button className='sidenav-link'>
          <span style={{ display: 'flex', justifyContent:"center" }}>
            {icon}&nbsp;&nbsp;{title}
          </span>
        </button>
      </div>
    </>
  )
}

export default SidenavIcon