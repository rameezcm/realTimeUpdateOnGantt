package org.atmosphere.samples.gantt;

import org.atmosphere.config.service.Disconnect;
import org.atmosphere.config.service.ManagedService;
import org.atmosphere.config.service.Message;
import org.atmosphere.config.service.Ready;
import org.atmosphere.runtime.AtmosphereResource;
import org.atmosphere.runtime.AtmosphereResourceEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 * Simple annotated class that demonstrate the power of Atmosphere. This class supports all transports, support
 * message length guarantee, heart beat, message cache thanks to the @ManagedService.
 */
@ManagedService(path = "/gantt")
public final class Gantt{
    private static final Logger logger = LoggerFactory.getLogger(Gantt.class);

    /**
     * Invoked when the connection as been fully established and suspended, e.g ready for receiving messages.
     *
     * @param r the atmosphere resource
     */
    @Ready
    public final void onReady(final AtmosphereResource r){
        logger.info("Browser {} connected.", r.uuid());
    }

    /**
     * Invoked when the client disconnect or when an unexpected closing of the underlying connection happens.
     *
     * @param event the event
     */
    @Disconnect
    public final void onDisconnect(final AtmosphereResourceEvent event){
        if(event.isCancelled())
            logger.info("Browser {} unexpectedly disconnected", event.getResource().uuid());
        else if(event.isClosedByClient())
            logger.info("Browser {} closed the connection", event.getResource().uuid());
    }

    /**
     * Simple annotated class that demonstrate how {@link org.atmosphere.config.managed.Encoder} and {@link org.atmosphere.config.managed.Decoder
     * can be used.
     *
     * @param message an instance of {@link ChatMessage }
     * @return the chat message
     * @throws IOException
     */
    @Message()
    public final Object onMessage(final Object obj) throws IOException{
        
        return obj;
    }

}