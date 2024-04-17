import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropDownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropDownOpen: !prevState.dropDownOpen
        }))
    }

    render() {
        return (

            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        aria-expanded={this.state.dropDownOpen}
                        data-toggle="dropdown"
                        tag="span">

                        <img
                            src="https://static.vecteezy.com/system/resources/previews/008/663/881/non_2x/cool-funky-santa-claus-logo-christmas-on-december-line-neon-art-portrait-colorful-design-with-dark-background-abstract-illustration-vector.jpg"
                            class="br-100 ba h3 w3 dib" alt="avatar" >
                        </img>

                    </DropdownToggle>
                    <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
                        <DropdownItem>View profile</DropdownItem>
                        <DropdownItem>Sign out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;