package ia.ecma.server.controller;

import ia.ecma.server.data.Data;
import ia.ecma.server.payload.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    SimpMessageSendingOperations simpMessageSendingOperations;// SimpMessageSendingOperations orqali topicga ulanganlarga malumotlarni beramiz

    @PostMapping
    private void addMessage(@RequestBody Message message){
      if (checkNull(message)){
          Data.messageList.add(message);
          simpMessageSendingOperations.convertAndSend("/message",Data.messageList);// SimpMessageSendingOperations orqali topicga ulanganlarga o'zgargan ma'lumotlarni beramiz malumotlarni beryapmiz
      }
    }
    private boolean checkNull(Message message){
        return message.getMessageContent() != null;
    }
}
