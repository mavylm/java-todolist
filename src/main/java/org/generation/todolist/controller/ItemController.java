package org.generation.todolist.controller;

import org.generation.todolist.controller.dto.ItemDTO;
import org.generation.todolist.repository.Entity.*;
import org.generation.todolist.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import java.sql.Date;
import java.io.*;

@RestController
@RequestMapping("/item")
public class ItemController {

    final ItemService itemService;

    public ItemController(@Autowired ItemService itemService) {
        this.itemService = itemService;
    }

    @CrossOrigin
    @GetMapping("/all")
    public Iterable<Item> getItems() {
        return itemService.all();
    }

    @CrossOrigin
    @PostMapping("/add")
    public Item save(@RequestParam(name="title", required = true) String title,
                     @RequestParam(name="description", required = true) String description,
                     @RequestParam(name="targetDate", required = true) Date targetDate) throws IOException {

        Item itemDto = new Item(title, description, targetDate);
        return itemService.save(itemDto);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Item findItemById(@PathVariable Integer id) {
        return itemService.findById(id);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public Item update(@PathVariable Integer id, @RequestBody ItemDTO itemDto) {
        Item item = itemService.findById(id);
        item.setTitle(itemDto.getTitle());
        item.setDescription(itemDto.getDescription());
        item.setTargetDate(itemDto.getTargetDate());
        return itemService.save(item);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        itemService.delete(id);
    }

}
