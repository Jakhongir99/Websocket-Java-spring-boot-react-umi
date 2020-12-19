package ia.ecma.server.controller;

import ia.ecma.server.data.Data;
import ia.ecma.server.payload.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    SimpMessageSendingOperations simpMessageSendingOperations;// SimpMessageSendingOperations orqali topicga ulanganlarga malumotlarni beramiz

    @PostMapping
    public void register(@RequestBody User user) {
        if (checkNUll(user)) {
            Data.userId++;
            user.setId(Data.userId);
            Data.userList.add(user);
            simpMessageSendingOperations.convertAndSend("/topics", user);
        }
    }

    public boolean checkNUll(User user) {
        return user.getName() != null;
    }
}
