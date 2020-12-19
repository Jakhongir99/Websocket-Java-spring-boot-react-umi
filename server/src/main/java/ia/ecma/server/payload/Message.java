package ia.ecma.server.payload;

import lombok.Data;

@Data
public class Message {
    private User user;
    private String messageContent;
}
