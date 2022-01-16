package org.generation.todolist.repository;

import org.springframework.data.repository.*;
import org.generation.todolist.repository.Entity.Item;

public interface ItemRepository extends CrudRepository<Item, Integer> {

}
