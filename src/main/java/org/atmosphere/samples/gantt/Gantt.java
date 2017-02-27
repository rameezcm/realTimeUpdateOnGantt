package org.atmosphere.samples.gantt;

import java.io.IOException;

import org.atmosphere.config.service.Disconnect;
import org.atmosphere.config.service.ManagedService;
import org.atmosphere.config.service.Message;
import org.atmosphere.config.service.Ready;
import org.atmosphere.runtime.AtmosphereResource;
import org.atmosphere.runtime.AtmosphereResourceEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ManagedService(path = "/gantt")
public final class Gantt{
    private static final Logger logger = LoggerFactory.getLogger(Gantt.class);

    @Ready
    public final void onReady(final AtmosphereResource r){
        logger.info("Browser {} connected.", r.uuid());
    }

    @Disconnect
    public final void onDisconnect(final AtmosphereResourceEvent event){
        if(event.isCancelled())
            logger.info("Browser {} unexpectedly disconnected", event.getResource().uuid());
        else if(event.isClosedByClient())
            logger.info("Browser {} closed the connection", event.getResource().uuid());
    }

    @Message()
    public final Object onMessage(final Object obj) throws IOException{
        
        return obj;
    }

}