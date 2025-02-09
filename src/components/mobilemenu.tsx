import MenuSection from "./menusection";
import '../styles/mobilemenu.scss'

interface MobileProps {
    display:boolean;
}


function MobileMenu({display}:MobileProps){

return(<>
<div className="scroll-modal">
<div className={display? 'white-modal slide-down show':`white-modal hidden slide-up`}>
    <MenuSection/>
</div>
</div>
<div className={display? 'blur-modal fade-in ':'blur-modal hidden fade-out '}>

</div>
</>)
}
export default MobileMenu;