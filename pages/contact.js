import {Box, Text } from "rebass";
import {Input, Label} from '@rebass/forms'
export function Contact() {
    return (
        <Box>
            <Text fontSize={2}>Any questions, comments, or concerns? Send them this way!</Text>

           <Box my={3}>
               <Label fontSize={3}>
                   Your Name
               </Label>

               <Input width={['50%','25%']} />
           </Box>
           <Box my={3}>
               <Label fontSize={3}>
                  Your Email
               </Label>

               <Input placeholder="contact@cmmnd.com" width={['50%','25%']} />
           </Box>
           <Box>
               <Label fontSize={3}>
                   Your Message
               </Label>

               <textarea placeholder={"Remember to add your order number if you have any order related questions."} style={{width: '50%', minHeight: '8rem'}} />
           </Box>

           <Box sx={{position: 'fixed', top: 100, left: '60%', width: '50%', bg: 'red', height: '100%', color: 'white'}}>INSERT PICTURE</Box>
        </Box>
    )
}

export default Contact;