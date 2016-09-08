/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zerjioang.apkr.remote.services;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author .local
 */
@Path("sync")
public class SyncResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of SyncResource
     */
    public SyncResource() {
    }
    
    @GET
    @Path("demo")
    @Produces(MediaType.TEXT_PLAIN)
    public String demo() {
        //TODO return proper representation object
        return "ok";
    }

    /**
     * Retrieves representation of an instance of com.zerjioang.apkr.remote.services.SyncResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }
}
