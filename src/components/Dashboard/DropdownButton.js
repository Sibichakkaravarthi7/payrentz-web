import React from 'react'
import { Dropdown, DropdownItem } from 'flowbite-react';

function DropdownButton({label, item1, item2, item3}) {
  return (
    <Dropdown label={label} style={{ backgroundColor: "#ED1F28", color: "#FFFFFF", padding: "0px"}} dismissOnClick={false}>
       <DropdownItem>{item1}</DropdownItem>
      <DropdownItem>{item2}</DropdownItem>
       <DropdownItem>{item3}</DropdownItem>
     </Dropdown>
  )
}

export default DropdownButton;
